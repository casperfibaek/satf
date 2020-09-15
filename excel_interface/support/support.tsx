import React from 'react';
import ReactDOM from 'react-dom';
import { Fabric, Text, initializeIcons, getTheme } from '@fluentui/react';

const divStyle = {
  fill: '#ba1223',
};

const Contact = () => {
  initializeIcons();
  return (
    <Fabric className="Contact">
      <div style={divStyle}>
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 520 177"
        >
          <title>niras_logo_new</title>
          <path
            id="niras"
            className="cls-1"
            d="M79.82,126.75,37.54,82.46H6v83.21H31.5l2.68-50.33,49.66,50.33h24.83V82.46H82.5ZM133.5,82.46H161v83.21H133.5Zm145.62,24.83c-1.34-21.47-24.83-25.5-43.62-26.17-15.43,0-51,1.34-51,1.34v83.21h24.83l4-66.43s10.07-.67,16.78-.67c10.74,0,18.12,4,18.79,10.74s-2,14.76-26.17,14.76v13.42l26.84,28.86h28.86L257,136.14c.67-.67,23.49-6.71,22.14-28.86m96-24.83H334.15s-4,6-17.45,32.88c-18.12-14.76-22.82-34.22-24.16-43.62h-.67v35.57a58.25,58.25,0,0,0,15.43,28.18C295.23,160.3,293.21,165,293.21,165h26.84l8.72-16.11h0a88.8,88.8,0,0,0,26.17,4.7V130.77a55.52,55.52,0,0,1-14.76-2.68l13.42-24.16,34.89,61.74h26.84S412,157.61,394.54,122c-15.43-33.55-19.46-39.59-19.46-39.59m93.28,28.86c-8.72-.67-13.42-2.68-13.42-6.71,0-5.37,6.71-7.38,20.8-7.38s32.88,2.68,32.88,2.68V80.44a311.54,311.54,0,0,0-42.28-2c-7.38,0-42.95,0-42.95,28.18,0,26.84,34.89,27.51,49.66,28.18,5.37,0,11.41,1.34,11.41,5.37.67,6.71-10.07,7.38-26.17,7.38a142.28,142.28,0,0,1-31.54-4v20.8S448.9,167,465.67,167c7.38,0,49,1.34,48.32-28.18.67-29.53-32.88-26.84-45.63-27.51M310,74.4c3.36-18.12,21.47-37.58,45.63-38.92V10C320.73,14,307.3,44.21,308,61.65c.67,4,.67,8.72,2,12.75Z" // eslint-disable-line
          />
        </svg>
      </div>
      <div>
        <Text block variant="large">
          <h1>Contact Form</h1>
          <p>NIRAS A/S</p>
          <p>Sortemosevej 19</p>
          <p>3450 Allerød</p>
          <p>T: +45 4810 4200</p>
          <p>F: +45 4810 4300</p>
          <p>E: Send e-mail</p>
          <p>CVR-nr. 3729 5728</p>
        </Text>
      </div>
      <div>
        <img src="images/helpdesk.png" alt="help desk"></img>
      </div>
    </Fabric>
  );
};

// export default Contact;
ReactDOM.render(
  <React.StrictMode>
    <Contact />
    {/* <Documentation /> */}
  </React.StrictMode>,
  document.getElementById('root'),
);

// <defs><style>.cls-1{fill:#ba1223;}</style></defs>
