import Groq from "groq-sdk";
import React, { useCallback, useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/native";

export default function TabOneScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const navigation = useNavigation(); // Get navigation instance

  const groq = new Groq({
    apiKey: "API_KEY",
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello, where do you want to go today?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "NaviBot",
          avatar: "https://avatar.iran.liara.run/public/49",
        },
      },
    ]);
  }, []);

  const onSend = useCallback(async (newMessages: any[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    try {
      const userMessage = newMessages[0].text;

      // List of health-related keywords
      const wellnessKeywords = [
        "not feeling well",
        "sick",
        "unwell",
        "ill",
        "feeling sick",
        "health",
        "wellness",
      ];

      // Check if the message contains any of the wellness keywords
      const isWellnessRelated = wellnessKeywords.some(keyword =>
        userMessage.toLowerCase().includes(keyword)
      );

      if (isWellnessRelated) {
        // If wellness-related, navigate to wellness center
        navigation.navigate("map"); // Ensure "wellnessCenter" is a valid route
      } else {
        // Make API call to extract location
        const results = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: `Extract the location mentioned in this sentence: "${userMessage}". Only return the location name without additional context. In case of sentences that are related to sickness or wellness, please return the location Wellness-Center.`,
            },
          ],
          model: "llama3-70b-8192",
        });

        const response = results.choices[0]?.message?.content.trim();
        
        console.log("Extracted Location:", response);

        // Check if the location contains "Malawi" and navigate
        if (response.toLowerCase().includes("malawi")) {
          navigation.navigate("map"); // Ensure "Map" is a valid route
        }
        else if(response.toLowerCase().includes("wellness-center")){
          navigation.navigate("map"); // Ensure "Map" is a valid route
        }
         else {
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, [
              {
                _id: 2,
                text: `I'm sorry, I can't help you with that. Please try again.`,
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "NaviBot",
                  avatar: "https://avatar.iran.liara.run/public/49",
                },
              },
            ])
          );
        }
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  }, [navigation]);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{ _id: 1 }}
    />
  );
}
