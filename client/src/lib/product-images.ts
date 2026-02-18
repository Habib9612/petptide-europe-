import bpc157Vial from "@assets/BPC-157_vial_v2_2_1771430363663.PNG";
import cjc1295Vial from "@assets/CJC-1295_vial_v2_2_1771430373110.PNG";
import hexarelinVial from "@assets/Hexarelin_vial_v2_2_1771430382653.PNG";

const productImageOverrides: Record<string, string> = {
  "bpc157-5mg": bpc157Vial,
  "cjc1295-nodac-5mg": cjc1295Vial,
  "hexarelin-2mg": hexarelinVial,
};

export function getProductImage(productId: string, fallbackUrl: string): string {
  return productImageOverrides[productId] || fallbackUrl;
}
