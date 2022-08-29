const colors = {
  black: '#000000',
  white: '#ffffff',
  green: '#3cb46e',
};

const common = {
  flexCenter: `
    display: flex;
    justify-contents: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
};

const deviceSizes = {
  mobile: '500px',
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
};

const theme = {
  device,
  colors,
  common,
};

export default theme;
