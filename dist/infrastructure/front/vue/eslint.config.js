"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eslint_plugin_vue_1 = __importDefault(require("eslint-plugin-vue"));
const eslint_config_typescript_1 = require("@vue/eslint-config-typescript");
const skip_formatting_1 = __importDefault(require("@vue/eslint-config-prettier/skip-formatting"));
// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup
exports.default = (0, eslint_config_typescript_1.defineConfigWithVueTs)({
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
}, {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
}, eslint_plugin_vue_1.default.configs['flat/essential'], eslint_config_typescript_1.vueTsConfigs.recommended, skip_formatting_1.default);
//# sourceMappingURL=eslint.config.js.map