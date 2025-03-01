import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform, FlatList } from 'react-native';
import * as Calendar from 'expo-calendar';
import { Link } from 'expo-router';

export default function App() {
  const [calendars, setCalendars] = useState<Calendar.Calendar[]>([]);
  const [events, setEvents] = useState<Calendar.Event[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
          // Get available calendars
          const availableCalendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
          setCalendars(availableCalendars);

          for (const calendar of availableCalendars) {
            const calendarId = calendar.id;
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
            if (calendarEvents.length) {
              setEvents(calendarEvents);
            }
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

      <Text style={styles.subHeader}>Upcoming classes</Text>
      <FlatList
        data={events}
        keyExtractor={(item: Calendar.Event) => item.calendarId + item.instanceId + item.id}
        renderItem={({ item }) => (
          <Link href={"/map"}>
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.title || "No Title"}</Text>
            <View style ={styles.timestampsView}>
            <Text>{new Date(item.startDate).toLocaleString()}</Text>
            <Text> - </Text>
            <Text>{new Date(item.endDate).toLocaleString()}</Text>
            </View>
            <Text style = {styles.eventLocation}>{item.location || "No Location"}</Text>
          </View>
          </Link>
        )}
        ListEmptyComponent={<Text>You have no upcoming classes</Text>}
      />
    </View>
  );
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
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
