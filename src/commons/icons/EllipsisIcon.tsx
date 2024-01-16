type Props = {
  width?: string;
  height?: string;
  viewBox?: string;
  fillColor?: string;
};
const EllipsisIcon = (props: Props) => {
  const {
    width = '20',
    height = '4',
    viewBox = '0 0 20 4',
    fillColor = '#212121',
  } = props;
  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none">
      <circle cx="2" cy="2" r="2" fill={fillColor} />
      <circle cx="10" cy="2" r="2" fill={fillColor} />
      <circle cx="18" cy="2" r="2" fill={fillColor} />
    </svg>
  );
};

export default EllipsisIcon;
