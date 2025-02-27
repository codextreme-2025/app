import { DataFrame, SensorSourceOptions, SourceNode } from "@openhps/core";
import { RelativeRSSI, WLANObject } from "@openhps/rf";
import WifiManager, { WifiEntry } from "react-native-wifi-reborn";

/**
 * WLAN source node using react-native-wifi-reborn.
 */
export class WLANSourceNode extends SourceNode<DataFrame> {
  // @ts-expect-error options is overridden
  protected options!: SensorSourceOptions;
  private _timer?: number;
  private _running = false;

  constructor(options: SensorSourceOptions = {}) {
    super(options);
    this.options.interval ??= this.options.interval;

    this.once("build", this._onWifiInit.bind(this));
    this.once("destroy", this.stop.bind(this));
  }

  private async _onWifiInit(): Promise<void> {
    const status = await WifiManager.isEnabled();

    if (!status) {
      throw new Error(`WiFi not enabled!`);
    }
    if (this.options.autoStart) {
      return this.start();
    } else {
      return;
    }
  }

  public async start(): Promise<void> {
    // Scan interval
    this._running = true;
    this._timer = setTimeout(
      this._scan.bind(this),
      this.options.interval,
    ) as any;
  }

  private _scan(): void {
    if (!this._running) {
      return;
    }

    // Keep scan id as timer identifier
    const scanId = this._timer;
    // Load wifi list
    WifiManager.reScanAndLoadWifiList()
      .then((wifiList: Array<WifiEntry>) => {
        this.push(this.parseList(wifiList));
      })
      .catch((ex: Error) => {
        this.logger("error", "Unable to scan for Wi-Fi access points!", ex);
      })
      .finally(() => {
        if (!this._running || this._timer !== scanId) {
          return;
        }
        this._timer = setTimeout(
          this._scan.bind(this),
          this.options.interval,
        ) as any;
      });
  }

  public async stop(): Promise<void> {
    this._running = false;
    clearTimeout(this._timer);
    this._timer = undefined;
  }

  public parseList(wifiList: Array<WifiEntry>): DataFrame {
    const frame = new DataFrame();
    frame.source = this.source;
    frame.source.relativePositions?.forEach((pos) =>
      frame.source.removeRelativePositions(pos.referenceObjectUID)
    );
    wifiList.forEach((value) => {
      const ap = new WLANObject(value.BSSID, value.level);
      ap.displayName = value.SSID;
      ap.frequency = value.frequency;
      ap.capabilities = value.capabilities;
      frame.addObject(ap);
      frame.source.addRelativePosition(new RelativeRSSI(ap, value.level));
    });
    return frame;
  }

  public async onPull(): Promise<DataFrame> {
    const wifiList = await WifiManager.loadWifiList();

    return this.parseList(wifiList);
  }
}
