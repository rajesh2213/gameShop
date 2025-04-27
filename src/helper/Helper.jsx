export const shuffleProduct = (productArr, count) => {
  //Fisher-Yates Shuffle
  const tempArray = [...productArr];
  for (let i = tempArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
  }
  return tempArray.slice(0, count);
};

export const transformProductData = (product) => {
  if (!product || !product.game_info) {
    return null;
  }
  return {
    id: product.game_info.id,
    title: product.game_info.name,
    description: product.game_info.short_desc,
    priceBeforeDiscount:
      Math.round(
        (product.game_info.lowest_price /
          (1 - product.game_info.highest_discount / 100)) *
          100
      ) / 100,
    price: product.game_info.lowest_price,
    discount: product.game_info.highest_discount,
    image: product.image,
    platform: product.game_info.platforms
      .filter((platform) => !platform.icon.startsWith("fak"))
      .map((platform) => [platform.name, platform.icon]),
  };
};
