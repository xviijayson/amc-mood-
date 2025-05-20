import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Linking, Alert } from 'react-native';
import { WebView } from 'react-native-webview';



const moods = [
  { title: 'HAPPY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5qOzVPo3zjjhaQNtV7bOUaUW3O_b1fgDnTw&s' },
  { title: 'RELAXING', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjoXxDtPY1fRMQ1y-SJjyZb-b9nOY521SMog&s' },
  { title: 'DREAMY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPOVp7XV3mfhqddfbXKNEZMa2O3u_LTVVCXw&s' },
  { title: 'PUMPED UP', image: 'https://img.freepik.com/free-photo/man-silhouette-angrily-screaming-shadow-back-lit-white-background_140725-161505.jpg?semt=ais_hybrid&w=740' },
  { title: 'SAD', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3TW6mLqATiReOEaMwwlgJIS5dc_XlpFikkQ&s' },
  { title: 'SEXY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRztRLhJO9JT3_kYGCTvCZV0uH1a_AzMWpg8A&s' },
  { title: 'FOCUSED', image: 'https://www.thoughtco.com/thmb/GaiuduCRVyxn3qWpJ5yWin2LfdU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-518845884-58d2d9625f9b584683f323ce.jpg' },
  { title: 'ANGRY', image: 'https://images.squarespace-cdn.com/content/v1/589b12468419c22a6dc74e65/1558341618782-7FJAPQ2YR2NRC5U2VP9J/image-asset.jpeg' },
  { title: 'IN LOVE', image: 'https://www.hcbh.org/media/giyfs1eb/falling-in-love.png' },
  { title: 'NOSTALGIC', image: 'https://www.brainsway.com/wp-content/uploads/2023/05/Nostalgic-Depression.jpg' },
];

const moodTracks = {
 HAPPY: [
    { title: "Happy – Pharrell Williams", embed: "https://open.spotify.com/embed/track/60nZcImufyMA1MKQY3dcCH" },
    { title: "Good as Hell – Lizzo", embed: "https://open.spotify.com/embed/track/0k664IuFwVP557Gnx7RhIl" },
    { title: "Can't Stop The Feeling – JT", embed: "https://open.spotify.com/embed/track/6JV2JOEocMgcZxYSZelKcc" },
    { title: "Walking on Sunshine", embed: "https://open.spotify.com/embed/track/3DQVGC1MFT3FGM3ZLbm1Nf" },
    { title: "Uptown Funk – Bruno Mars", embed: "https://open.spotify.com/embed/track/32OlwWuMpZ6b0aN2RZOeMS" },
  ],
  RELAXING: [
  { title: "Electra – Airstream", embed: "https://open.spotify.com/embed/track/2ZsWcZ2Zq3c5vZzZzZzZzZ" },
  { title: "Clair de Lune – Claude Debussy", embed: "https://open.spotify.com/embed/track/3zBhihYUHBmGd2bcQIobrF" },
  { title: "Holocene – Bon Iver", embed: "https://open.spotify.com/embed/track/0bYg9bo50gSsH3LtXe2SQn" },
  { title: "Pure Shores – All Saints", embed: "https://open.spotify.com/embed/track/1cTZMwcBJT0Ka3UJPXOeeN" },
  { title: "Someone Like You – Adele", embed: "https://open.spotify.com/embed/track/4kflIGfjdZJW4ot2ioixTB" },
],
  DREAMY: [
    { title: "I'll Be Missing You", embed: "https://open.spotify.com/embed/track/7H6ev70Weq6DdpZyyTmUXk" },
    { title: "Cold Little Heart", embed: "https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp" },
    { title: "Where Is My Mind", embed: "https://open.spotify.com/embed/track/2VxeLyX666F8uXCJ0dZF8B" },
    { title: "Apocalypse - Cigarettes After Sex", embed: "https://open.spotify.com/embed/track/3AVrVz5rK8Hrqo9YGiVGN5" },
    { title: "In The Air Tonight", embed: "https://open.spotify.com/embed/track/18AXbzPzBS8Y3AkgSxzJPb" },
  ],
  PUMPED_UP: [
    { title: "Eye of the Tiger – Survivor", embed: "https://open.spotify.com/embed/track/2KH16WveTQWT6KOG9Rg6e2" },
    { title: "Power – Kanye West", embed: "https://open.spotify.com/embed/track/5nNmj1cLH3r4aA4XDJ2bgY" },
    { title: "Lose Yourself – Eminem", embed: "https://open.spotify.com/embed/track/1bSpwPhAxZwlR2enJJsv7U" },
    { title: "Stronger – Kanye West", embed: "https://open.spotify.com/embed/track/2p0zSBtgJwZTbzTn0nZ2xW" },
    { title: "Till I Collapse – Eminem", embed: "https://open.spotify.com/embed/track/0f8sVY8nloH4Cim5xYQX2n" },
  ],
SAD: [
    { title: "Someone Like You – Adele", embed: "https://open.spotify.com/embed/track/4kflIGfjdZJW4ot2ioixTB" },
    { title: "Let Her Go – Passenger", embed: "https://open.spotify.com/embed/track/4Y1fTcf3dYJiRz6C3nYhWW" },
    { title: "When I Was Your Man – Bruno Mars", embed: "https://open.spotify.com/embed/track/0y60itmpH0aPKsFiGxmtnh" },
    { title: "Fix You – Coldplay", embed: "https://open.spotify.com/embed/track/6KuQTIu1KoTTkLXKrwlLPV" },
    { title: "The Night We Met – Lord Huron", embed: "https://open.spotify.com/embed/track/2u8XzYh6VhXdiK8vL7zRbq" },
  ],
SEXY: [
    { title: "Call Out My Name – The Weeknd", embed: "https://open.spotify.com/embed/track/2XU0oxnq2qxCpomAAuJY8K" },
    { title: "Redbone – Childish Gambino", embed: "https://open.spotify.com/embed/track/3UmaczJpikHgJFyBTAJVoz" },
    { title: "Earned It (Fifty Shades of Grey) – The Weeknd", embed: "https://open.spotify.com/embed/track/1cQ3LIkZE68pMSnPhZWXLu" },
    { title: "Lotus Flower – Radiohead", embed: "https://open.spotify.com/embed/track/6G8kHiVZlDPOmcUUMqGgGj" },
    { title: "Adorn – Miguel", embed: "https://open.spotify.com/embed/track/0FnbfN1X2o7Yqf4Hl5w0iJ" },
  ],
FOCUSED: [
  { title: "Weightless – Marconi Union", embed: "https://open.spotify.com/embed/track/6kkwzB6hXLIONkEk9JciA6" },
  { title: "Night Owl – Galimatias", embed: "https://open.spotify.com/embed/track/4xsum9mtqZB1pUuhw6wCQo" },
  { title: "Kusanagi – Oatmello", embed: "https://open.spotify.com/embed/track/5APkeOxFMV3oEo2pR9tgS0" },
  { title: "Luv(sic) Part 3 – Nujabes", embed: "https://open.spotify.com/embed/track/4xlpJ99yL9xYQtzG6c3hwk" },
  { title: "Drift – Nosaj Thing", embed: "https://open.spotify.com/embed/track/2uOpFzvNQqFAWh8lZxosX0" },

],
ANGRY: [
  { title: "Psychosocial – Slipknot", embed: "https://open.spotify.com/embed/track/2MvIMgtWyK88OiPi0J8Dg3" },
  { title: "Chop Suey! – System Of A Down", embed: "https://open.spotify.com/embed/track/7kwiwQhWRBSP1PJv4ZFJUK" },
  { title: "Down with the Sickness – Disturbed", embed: "https://open.spotify.com/embed/track/79qOmULc1p6IP1do5kgwg7" },
  { title: "Bodies – Drowning Pool", embed: "https://open.spotify.com/embed/track/3xktQXIr1OD3ENc19viwDP" },
  { title: "Freak on a Leash – Korn", embed: "https://open.spotify.com/embed/track/7B9S4RiRczdw1B9ddjpFe8" },
],
IN_LOVE: [
  { title: "Perfect – Ed Sheeran", embed: "https://open.spotify.com/embed/track/0tgVpDi06FyKpA1z0VMD4v" },
  { title: "All of Me – John Legend", embed: "https://open.spotify.com/embed/track/3U4isOIWM3VvDubwSI3y7a" },
  { title: "Thinking Out Loud – Ed Sheeran", embed: "https://open.spotify.com/embed/track/34gCuhDGsG4bRPIf9bb02f" },
  { title: "Just the Way You Are – Bruno Mars", embed: "https://open.spotify.com/embed/track/7BqBn9nzAq8spo5e7cZ0dJ" },
  { title: "Adore You – Harry Styles", embed: "https://open.spotify.com/embed/track/3jjujdWJ72nww5eGnfs2E7" },
],
NOSTALGIC: [
  { title: "Bohemian Rhapsody – Queen", embed: "https://open.spotify.com/embed/track/7tFiyTwD0nx5a1eklYtX2J" },
  { title: "Take On Me – a-ha", embed: "https://open.spotify.com/embed/track/2WfaOiMkCvy7F5fcp2zZ8L" },
  { title: "Africa – Toto", embed: "https://open.spotify.com/embed/track/2374M0fQpWi3dLnB54qaLX" },
  { title: "Smells Like Teen Spirit – Nirvana", embed: "https://open.spotify.com/embed/track/5ghIJDpPoe3CfHMGu71E6T" },
  { title: "Every Breath You Take – The Police", embed: "https://open.spotify.com/embed/track/5Z01UMMf7V1o0MzF86s6WJ" },
],
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [chatBotMessage, setChatBotMessage] = useState('');

  const handleSearch = () => {
    return moods.filter((mood) =>
      mood.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleMoodSelect = (moodTitle) => {
    setSelectedMood(moodTitle);
    setChatBotMessage(`Hey! You're feeling ${moodTitle.toLowerCase()}! Here's some great tunes for that mood! 🎶`);
  };

  const renderTracks = () => {
    const currentTracks = moodTracks[selectedMood.replace(' ', '_')] || [];

    return (
      <ScrollView style={styles.trackList}>
        <Text style={styles.subtitle}>VIBES FOR A {selectedMood} MOOD</Text>
        <Text style={styles.chatbot}>{chatBotMessage}</Text>
        {currentTracks.map((track, index) => (
          <View key={index} style={styles.trackContainer}>
            <WebView source={{ uri: track.embed }} style={styles.webview} javaScriptEnabled />
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => setSelectedMood(null)}>
          <Text style={styles.buttonText}>HOME</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

const isPasswordStrong = (pwd) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
  return regex.test(pwd);
};

  const handleAuth = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long');
      return;
    }

    setIsAuthenticated(true);
    setEmail('');
    setPassword('');
  };

  const renderAuthScreen = () => (
    <View style={styles.authContainer}>
      <Text style={styles.header}>{isSignup ? 'SIGN UP' : 'LOGIN'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isSignup ? 'Sign Up' : 'Login'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
        <Text style={styles.switchText}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (!isAuthenticated) return renderAuthScreen();

  return (
    <View style={styles.container}>
      {!selectedMood ? (
        <ScrollView>
          <Text style={styles.header}>GROOVE 🎧 TUNES</Text>
          <View style={styles.socialLinks}>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/nosyaj.otnicaj.9')}><Text style={styles.link}>Facebook</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/xviijayson/')}><Text style={styles.link}>Instagram</Text></TouchableOpacity>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search mood..."
            placeholderTextColor="#999"
            onChangeText={setSearchTerm}
            value={searchTerm}
          />
          <Text style={styles.subtitle}>FEATURED MOODS</Text>
          <View style={styles.moodGrid}>
            {handleSearch().map((mood, index) => (
              <TouchableOpacity key={index} onPress={() => handleMoodSelect(mood.title)} style={styles.moodBox}>
                <Image source={{ uri: mood.image }} style={styles.moodImage} />
                <Text style={styles.moodLabel}>{mood.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : renderTracks()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    paddingTop: 50,
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#1E1E1E',
    color: '#fff',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchText: {
    color: '#aaa',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1DB954',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  moodBox: {
    width: '45%',
    margin: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
  },
  moodImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  moodLabel: {
    color: '#fff',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackList: {
    padding: 10,
    backgroundColor: '#0D0D0D',
  },
  trackContainer: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    height: 80,
  },
  webview: {
    height: '100%',
    width: '100%',
  },
  chatbot: {
    color: '#1DB954',
    fontStyle: 'italic',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  link: {
    color: '#1DB954',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
