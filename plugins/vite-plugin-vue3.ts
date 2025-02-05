import { Plugin } from 'vite';

export  function vue3Plugin(): Plugin {
    return {
        name: 'vite-plugin-vue3',
        enforce: 'pre',
        resolveId(source) {
            if (source === 'vue') {
                return source;
            }
            return null;
        },
        load(id) {
            if (id === 'vue') {
                
            }
            return null;
        }
    };
}