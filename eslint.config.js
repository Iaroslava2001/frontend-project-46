import globals from "globals";
import pluginJs from "@eslint/js";
import jestPlugin from "eslint-plugin-jest"; // Правильный импорт плагина jest

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest, // Добавляем глобальные переменные для Jest
      },
    },
  },
  pluginJs.configs.recommended, // Используем рекомендованные настройки ESLint
  {
    plugins: {
      jest: jestPlugin, // Подключаем плагин Jest
    },
    rules: {
      ...jestPlugin.configs.recommended.rules, // Добавляем рекомендованные правила для Jest
    },
  },
];