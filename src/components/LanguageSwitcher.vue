<template>
  <select @change="switchLanguage">
    <option
        v-for="sLocale in supportedLocales"
        :key="`locale-${sLocale}`"
        :value="sLocale"
        :selected="locale === sLocale"
    >
      {{ t(`locale.${sLocale}`) }}
    </option>
  </select>
</template>
<script>
import { useI18n } from 'vue-i18n'
import Tr from "@/i18n/translation"
import { useRouter } from "vue-router"
export default {
  setup() {
    const { t, locale } = useI18n();
    const supportedLocales = Tr.supportedLocales;
    const router = useRouter();

    const switchLanguage = (event) => {
      const newLocale = event.target.value;
      Tr.switchLanguage(newLocale);
      try {
        router.replace({ params: { locale: newLocale } });
      } catch (error) {
        console.log(error);
        router.push('/');
      }
    };

    return { t, locale, supportedLocales, switchLanguage };
  },
};

</script>