const dimensions = {
  'sheers-living': [1280, 960], 'sheers-panorama': [1280, 960],
  'sfold-detail': [1200, 1600], 'sheers-full-height': [1600, 1200],
  'sheers-kitchen': [1600, 1200], 'sheers-bedroom': [1200, 1600],
  'sheers-bedroom-warm': [960, 1280], 'sheers-corner': [960, 1280],
  'blockout-room': [1600, 1200], 'blockout-bedroom': [1200, 1600],
  'blockout-office': [1600, 1200], 'roller-layering': [1600, 1200],
};

export default function ProjectImage({ name, alt, sizes = '(max-width: 760px) 100vw, 50vw', priority = false, ...props }) {
  const [width, height] = dimensions[name];
  const widths = [...new Set([480, 960, 1600, width].filter(candidate => candidate <= width))].sort((first, second) => first - second);
  return <img src={`/assets/projects/${name}-v1-${width}.webp`} srcSet={widths.map(candidate => `/assets/projects/${name}-v1-${candidate}.webp ${candidate}w`).join(', ')} sizes={sizes} alt={alt} width={width} height={height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" {...props} />;
}
