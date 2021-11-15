<template>
  <div class="container-center flex-col">
    <input
      @change="toggleTheme"
      id="checkbox"
      type="checkbox"
      class="switch-checkbox hidden"
    />
    <label for="checkbox" class="switch-label">
      <span v-if="userTheme === 'light-theme'">🌙</span>
      <span v-if="userTheme === 'dark-theme'">☀️</span>
      <div
        class="switch-toggle"
        :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"
      ></div>
    </label>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate() {
    this.$store.replaceState({ cities: [], forecast_details: [] });
    this.$store.commit('getWeatherData');
  },
  created() {
    const initUserTheme = this.getMediaPreference();
    this.setTheme(initUserTheme);
  },
  data() {
    return {
      userTheme: 'light-theme',
    };
  },
  methods: {
    setTheme(theme) {
      localStorage.setItem('user-theme', theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },
    toggleTheme() {
      const activeTheme = localStorage.getItem('user-theme');
      if (activeTheme === 'light-theme') {
        this.setTheme('dark-theme');
      } else {
        this.setTheme('light-theme');
      }
    },
    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      if (hasDarkPreference) {
        return 'dark-theme';
      } else {
        return 'light-theme';
      }
    },
  },
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
/* Define styles for the default root window element */
:root {
  /* background: #83a4d4; fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #b6fbff,
    #83a4d4
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #b6fbff,
    #83a4d4
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

/* Define styles for the root window with dark - mode preference */
:root.dark-theme {
  /* --background-color-primary: #525252; */
  --background-color-secondary: #717174;
  --accent-color: #3f3f3f;
  --text-primary-color: #ddd;
  --text-emphasis-color: var(--text-primary-color);
  background: #0f2027; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #2c5364,
    #203a43,
    #0f2027
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #2c5364,
    #203a43,
    #0f2027
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

p {
  color: var(--text-primary-color);
}

h3,
h4,
h5 {
  color: var(--text-primary-color);
}
.container-center {
  background-color: var(--background-color-primary);
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  padding: 2rem 4rem;
  height: 200px;
  width: 300px;
  text-align: center;
  border: 1px solid var(--accent-color);
  border-radius: 4px;
  background-color: var(--background-color-secondary);
}
.switch-toggle {
  position: absolute;
  background-color: var(--background-color-primary);
  border-radius: 50%;
  top: calc(var(--element-size) * 0.07);
  left: calc(var(--element-size) * 0.07);
  height: calc(var(--element-size) * 0.4);
  width: calc(var(--element-size) * 0.4);
  transform: translateX(0);
  transition: transform 0.3s ease, background-color 0.5s ease;
}

.switch-label {
  /* for width, use the standard element-size */
  width: var(--element-size);

  /* for other dimensions, calculate values based on it */
  border-radius: var(--element-size);
  border: calc(var(--element-size) * 0.025) solid var(--accent-color);
  padding: calc(var(--element-size) * 0.1);
  font-size: calc(var(--element-size) * 0.3);
  height: calc(var(--element-size) * 0.35);

  align-items: center;
  background: var(--text-primary-color);
  cursor: pointer;
  display: flex;
  position: relative;
  transition: background 0.5s ease;
  justify-content: space-between;
  z-index: 1;
}
</style>
