<template>
  <main>
    <h1>{{ $t("home.header") }}</h1>
    <p>{{ $t("home.created_by", {company: "Lokalise"}) }}</p>
    <p>{{ $t("home.num_visits", 1) }}</p>
    <p>{{ $d(new Date(), "longFormat") }}</p>
  </main>
</template>
<script>
import { useI18n } from 'vue-i18n'

export default {
  setup() {
    const { t, te } = useI18n()

    if (te("missing.key")) {
      console.log("Here's your translation", t("missing.key"))
    } else {
      console.log("Can't find this translation!")
    }

    return { t }
  }
}
</script>
