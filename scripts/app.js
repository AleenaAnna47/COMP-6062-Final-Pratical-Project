const Home = {
    template: `
        <div class="text-center">
            <h2>Welcome to the Aleena's COMP-6062 Final Practical Project</h2>
            <p>Select a module from the navigation menu.</p>
            <img src="https://onlinegiftools.com/images/examples-onlinegiftools/jump-hello-transparent.gif" alt="Project Image" class="home-image"/>
        </div>
    `
};

const RandomFact = {
    data() {
        return { randomFact: '' };
    },
    methods: {
        getNewFact() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
                .then(response => response.json())
                .then(data => this.randomFact = data.text)
                .catch(error => console.error('Error fetching fact:', error));
        }
    },
    created() {
        this.getNewFact();
    },
    template: `
        <div class="module">
            <h2>RANDOM FACT</h2>
            <p>{{ randomFact }}</p>
            <button @click="getNewFact" class="btn btn-primary">New Fact</button>
        </div>
    `
};

const WeatherInfo = {
    data() {
        return {
            city: 'London',
            weather: { temperature: '', wind: '', description: '' }
        };
    },
    methods: {
        getWeather() {
            fetch(`https://goweather.herokuapp.com/weather/${this.city}`)
                .then(response => response.json())
                .then(data => {
                    this.weather.temperature = data.temperature;
                    this.weather.wind = data.wind;
                    this.weather.description = data.description;
                })
                .catch(error => console.error('Error fetching weather:', error));
        }
    },
    created() {
        this.getWeather();
    },
    template: `
    <div class="module">
        <h2>WEATHER INFORMATION</h2>
        <p>City: <input v-model="city" type="text" placeholder="Enter city name"> <button @click="getWeather" class="btn btn-primary">Get Weather</button></p>
        <p><i class="fas fa-thermometer-half"></i> Temperature: {{ weather.temperature }}</p>
        <p><i class="fas fa-wind"></i> Wind: {{ weather.wind }}</p>
        <p><i class="fas fa-cloud"></i> Description: {{ weather.description }}</p>
    </div>
    `
};

const Dictionary = {
    data() {
        return {
            word: '',
            definition: { word: '', phonetic: '', partOfSpeech: '', definition: '' }
        };
    },
    methods: {
        getDefinition() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)
                .then(response => response.json())
                .then(data => {
                    const entry = data[0];
                    this.definition.word = entry.word;
                    this.definition.phonetic = entry.phonetic;
                    this.definition.partOfSpeech = entry.meanings[0].partOfSpeech;
                    this.definition.definition = entry.meanings[0].definitions[0].definition;
                })
                .catch(error => console.error('Error fetching definition:', error));
        }
    },
    template: `
        <div class="module">
            <h2>DICTIONARY</h2>
            <p>Word: <input v-model="word" type="text" placeholder="Enter a word"> <button @click="getDefinition" class="btn btn-primary">Get Definition</button></p>
            <p><i class="fas fa-book"></i> Word: {{ definition.word }}</p>
            <p><i class="fas fa-volume-up"></i> Phonetic: {{ definition.phonetic }}</p>
            <p><i class="fas fa-language"></i> Part of Speech: {{ definition.partOfSpeech }}</p>
            <p><i class="fas fa-info-circle"></i> Definition: {{ definition.definition }}</p>
        </div>
        </div>
    `
};

const routes = [
    { path: '/', component: Home },
    { path: '/random-fact', component: RandomFact },
    { path: '/weather-info', component: WeatherInfo },
    { path: '/dictionary', component: Dictionary }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

const app = Vue.createApp({});
/// Mount the app to the #router element
app.use(router); 

/// Mount the app to the #app element
app.mount('#app');
