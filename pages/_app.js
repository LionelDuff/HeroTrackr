import "@/styles/globals.css";
import React from "react";
import { useEffect, useState } from "react";

import { ConfigProvider } from "antd";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { configureStore, rootReducer } from "@/redux/store";

import Loader from "@/components/Loader";

import theme from "@/theme/themeConfig";

export default function App({ Component, pageProps }) {
  const [store, setStore] = useState(null);
  const [persistor, setPersistor] = useState(null);

  useEffect(() => {
    const initStore = async () => {
      if (typeof window !== "undefined") {
        const { persistStore, persistReducer } = await import("redux-persist");
        const storage = (await import("redux-persist/lib/storage")).default;

        const persistConfig = { key: "herotrackr", storage };
        const persistedReducer = persistReducer(persistConfig, rootReducer);

        const s = configureStore({
          reducer: persistedReducer,
          middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ serializableCheck: false }),
        });

        const p = persistStore(s);
        setStore(s);
        setPersistor(p);
      }
    };

    initStore();
  }, []);

  if (!store || !persistor) return <Loader />;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loader />}>
        <ConfigProvider theme={theme}>
          <Component {...pageProps} />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}
