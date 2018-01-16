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

export const filterMoney = (money) => {
  const splittedMoney = money.toString().split('');

  for (let i = splittedMoney.length - 3; i > 0; i -= 3) {
    splittedMoney.splice(i, 0, ' ');
  }

  return splittedMoney;
};
