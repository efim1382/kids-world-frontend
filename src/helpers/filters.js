import { uploadPath } from 'configuration';
import categories from 'containers/Profile/Adverts/categories';

export const filterCategories = advertCategory =>
  categories.filter(category => category.value === advertCategory)[0].name;

export const filterAdvertImage = (image) => {
  if (image === '/images/ad-image.jpg') return `url('${image}')`;
  return `url(${uploadPath}/${image})`;
};

export const filterUserPhoto = (image) => {
  if (image === '/images/user-image.jpg') return `url('${image}')`;
  return `url(${uploadPath}/${image})`;
};
