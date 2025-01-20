<template>
  <div id="nav">
    <router-link to="/about">About</router-link> |
    <router-link to="/canvas-lines">CanvasLines</router-link>
  </div>

  <router-view/>
</template>

<style>
  html {
    height: 100%;
  }

  body {
    height: calc(100% - 16px);
    background-color: #3b4652;
    overflow-y: scroll;
  }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: hsl(213, 13%, 83%);
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #e48fbe;
}

#nav a.router-link-exact-active {
  color: #ff5d22;
}
</style>
