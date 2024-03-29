import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Button, Result } from 'antd';

const isMobile = () => {
  return /Mobi|Android/i.test(navigator.userAgent);
};

const isSmallWidth = () => {
  return window.innerWidth < 600; // Điều chỉnh ngưỡng theo nhu cầu của bạn
};

if (isMobile() || isSmallWidth()) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <Result
      title="Hiện Website chưa hỗ trợ trên di động vui lòng tải app để có trải nghiệm tốt hơn"
      extra={
        <a href='https://expo.dev/artifacts/eas/p5fx9jw3Pumv8h9QpSui3f.apk'><Button type="primary" key="console">
          Tải App
        </Button></a>

      }
    />
  );
} else {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}
