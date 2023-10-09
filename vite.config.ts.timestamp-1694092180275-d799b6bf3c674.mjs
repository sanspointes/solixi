// vite.config.ts
import { defineConfig } from "file:///home/cgm/projects/personal/bearbroidery/node_modules/.pnpm/vite@4.4.7_@types+node@18.17.0/node_modules/vite/dist/node/index.js";
import solid from "file:///home/cgm/projects/personal/bearbroidery/node_modules/.pnpm/vite-plugin-solid@2.7.0_solid-js@1.7.11_vite@4.4.7/node_modules/vite-plugin-solid/dist/esm/index.mjs";
import dts from "file:///home/cgm/projects/personal/bearbroidery/node_modules/.pnpm/vite-plugin-dts@3.3.1_typescript@5.0.4_vite@4.4.7/node_modules/vite-plugin-dts/dist/index.mjs";
import inspect from "file:///home/cgm/projects/personal/bearbroidery/node_modules/.pnpm/vite-plugin-inspect@0.7.14_rollup@3.26.3_vite@4.4.7/node_modules/vite-plugin-inspect/dist/index.mjs";
import solidDevtoolsPlugin from "file:///home/cgm/projects/personal/bearbroidery/node_modules/.pnpm/solid-devtools@0.27.4_solid-js@1.7.11_vite@4.4.7/node_modules/solid-devtools/dist/vite.js";
var vite_config_default = defineConfig(({ mode }) => {
  const plugins = [
    dts({
      insertTypesEntry: true,
      outDir: "./dist/"
    }),
    inspect(),
    solid()
  ];
  if (mode === "development") {
    plugins.push(solidDevtoolsPlugin({ autoname: true }));
  }
  return {
    plugins,
    build: {
      emptyOutDir: false,
      lib: {
        entry: "./src/index.ts",
        formats: ["es"],
        fileName: (format) => `solixi.${format}.js`,
        name: "solixi"
      },
      minify: false,
      rollupOptions: {
        external: [
          "solid-js",
          "solid-js/web",
          "solid-js/store",
          "@pixi/app",
          "@pixi/assets",
          "@pixi/core",
          "@pixi/display",
          "@pixi/layers",
          "@pixi/mesh",
          "@pixi/mesh-extras",
          "@pixi/ticker",
          "@pixi/utils",
          "@pixi/graphics",
          "@pixi/events",
          "@pixi/text",
          "@pixi/sprite"
        ]
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9jZ20vcHJvamVjdHMvcGVyc29uYWwvYmVhcmJyb2lkZXJ5L3BhY2thZ2VzL3NvbGl4aVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvY2dtL3Byb2plY3RzL3BlcnNvbmFsL2JlYXJicm9pZGVyeS9wYWNrYWdlcy9zb2xpeGkvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvY2dtL3Byb2plY3RzL3BlcnNvbmFsL2JlYXJicm9pZGVyeS9wYWNrYWdlcy9zb2xpeGkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIHR5cGUgUGx1Z2luIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBzb2xpZCBmcm9tICd2aXRlLXBsdWdpbi1zb2xpZCdcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xuaW1wb3J0IGluc3BlY3QgZnJvbSBcInZpdGUtcGx1Z2luLWluc3BlY3RcIjtcbmltcG9ydCBzb2xpZERldnRvb2xzUGx1Z2luIGZyb20gXCJzb2xpZC1kZXZ0b29scy92aXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoe21vZGV9KSAgPT4ge1xuICBjb25zdCBwbHVnaW5zID0gW1xuICAgIGR0cyh7XG4gICAgICBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlLFxuICAgICAgb3V0RGlyOiBcIi4vZGlzdC9cIixcbiAgICB9KSxcbiAgICBpbnNwZWN0KCksXG4gICAgc29saWQoKSxcbiAgXTtcbiAgaWYgKG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgIHBsdWdpbnMucHVzaChzb2xpZERldnRvb2xzUGx1Z2luKHsgYXV0b25hbWU6IHRydWUgfSkgYXMgUGx1Z2luKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGx1Z2lucyxcbiAgICBidWlsZDoge1xuICAgICAgZW1wdHlPdXREaXI6IGZhbHNlLFxuICAgICAgbGliOiB7XG4gICAgICAgIGVudHJ5OiAnLi9zcmMvaW5kZXgudHMnLFxuICAgICAgICBmb3JtYXRzOiBbJ2VzJ10sXG4gICAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgc29saXhpLiR7Zm9ybWF0fS5qc2AsXG4gICAgICAgIG5hbWU6ICdzb2xpeGknLFxuICAgICAgfSxcbiAgICAgIG1pbmlmeTogZmFsc2UsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIGV4dGVybmFsOiBbXG4gICAgICAgICAgJ3NvbGlkLWpzJyxcbiAgICAgICAgICAnc29saWQtanMvd2ViJyxcbiAgICAgICAgICAnc29saWQtanMvc3RvcmUnLFxuICAgICAgICAgICdAcGl4aS9hcHAnLFxuICAgICAgICAgICdAcGl4aS9hc3NldHMnLFxuICAgICAgICAgICdAcGl4aS9jb3JlJyxcbiAgICAgICAgICAnQHBpeGkvZGlzcGxheScsXG4gICAgICAgICAgJ0BwaXhpL2xheWVycycsXG4gICAgICAgICAgJ0BwaXhpL21lc2gnLFxuICAgICAgICAgICdAcGl4aS9tZXNoLWV4dHJhcycsXG4gICAgICAgICAgJ0BwaXhpL3RpY2tlcicsXG4gICAgICAgICAgJ0BwaXhpL3V0aWxzJyxcbiAgICAgICAgICAnQHBpeGkvZ3JhcGhpY3MnLFxuICAgICAgICAgICdAcGl4aS9ldmVudHMnLFxuICAgICAgICAgICdAcGl4aS90ZXh0JyxcbiAgICAgICAgICAnQHBpeGkvc3ByaXRlJyxcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICB9LFxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwVixTQUFTLG9CQUFpQztBQUNwWSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sYUFBYTtBQUNwQixPQUFPLHlCQUF5QjtBQUVoQyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFDLEtBQUksTUFBTztBQUN2QyxRQUFNLFVBQVU7QUFBQSxJQUNkLElBQUk7QUFBQSxNQUNGLGtCQUFrQjtBQUFBLE1BQ2xCLFFBQVE7QUFBQSxJQUNWLENBQUM7QUFBQSxJQUNELFFBQVE7QUFBQSxJQUNSLE1BQU07QUFBQSxFQUNSO0FBQ0EsTUFBSSxTQUFTLGVBQWU7QUFDMUIsWUFBUSxLQUFLLG9CQUFvQixFQUFFLFVBQVUsS0FBSyxDQUFDLENBQVc7QUFBQSxFQUNoRTtBQUVBLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxhQUFhO0FBQUEsTUFDYixLQUFLO0FBQUEsUUFDSCxPQUFPO0FBQUEsUUFDUCxTQUFTLENBQUMsSUFBSTtBQUFBLFFBQ2QsVUFBVSxDQUFDLFdBQVcsVUFBVSxNQUFNO0FBQUEsUUFDdEMsTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBLFFBQVE7QUFBQSxNQUNSLGVBQWU7QUFBQSxRQUNiLFVBQVU7QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
