import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform, FlatList } from 'react-native';
import * as Calendar from 'expo-calendar';

export default function App() {
  const [calendars, setCalendars] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
          // Get available calendars
          const availableCalendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
          setCalendars(availableCalendars);

          // Option: Pick the first calendar to fetch events from
          // TODO: refactor to make calender with student email as the primary calendar

          if (availableCalendars.length > 0) {
            const calendarId = availableCalendars[1].id;
            // Define the time range for events
            const now = new Date();
            const oneMonthLater = new Date();
            oneMonthLater.setMonth(now.getMonth() + 1);

            // Fetch events within the specified time range
            const calendarEvents = await Calendar.getEventsAsync(
              [calendarId],
              now,
              oneMonthLater
            );
            setEvents(calendarEvents);
          }
        }
        else{
            console.log("Calendar permission not granted");
        }
      } catch (error) {
        console.error("Error fetching calendar data: ", error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Calendar Module Example</Text> */}
      {/* <Button title="Create a new calendar" onPress={createCalendar} /> */}

      <Text style={styles.subHeader}>Calendar Events:</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.title || "No Title"}</Text>
            <View style ={styles.timestampsView}>
            <Text>{new Date(item.startDate).toLocaleString()}</Text>
            <Text> - </Text>
            <Text>{new Date(item.endDate).toLocaleString()}</Text>
            </View>
            <Text style = {styles.eventLocation}>{item.location || "No Location"}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No events found for this period.</Text>}
      />
    </View>
  );
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Expo Calendar' };
  try {
    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Expo Calendar',
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
  } catch (error) {
    console.error("Error creating calendar: ", error);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 18,
  },
  eventItem: {
    padding: 10,
    marginVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: '100%',
  },
  eventTitle: {
    fontWeight: 'bold',
  },
  timestampsView: {
    flexDirection: 'row',
    gap: 5,
  },
  eventLocation: {
    color: 'gray',
    fontStyle: 'italic',
  },
});
