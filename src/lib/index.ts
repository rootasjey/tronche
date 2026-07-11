export { hashCode, getRandomColor, getUnit, getBoolean, getContrast, getDigit, getModulus, getAngle } from './utilities';

export type { AvatarVariant, AvatarOptions, AvatarData } from './types';

export {
  generateMarbleData, generateMarbleSvg, renderMarbleSvg,
  generateBauhausData, generateBauhausSvg, renderBauhausSvg,
  generateBeamData, generateBeamSvg, renderBeamSvg,
  generatePixelData, generatePixelSvg, renderPixelSvg,
  generateRingData, generateRingSvg, renderRingSvg,
  generateSunsetData, generateSunsetSvg, renderSunsetSvg,
} from './generators';

export type {
  MarbleData, MarbleElement,
  BauhausData, BauhausElement,
  BeamData,
  PixelData,
  RingData,
  SunsetData,
} from './generators';
