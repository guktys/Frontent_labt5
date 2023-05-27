<template>
  <div>
    <h1>{{ $t("about.header") }}</h1>
    <p>{{ $t("about.donations", { donations: $n(1456, "currencyFormat") }) }}</p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
