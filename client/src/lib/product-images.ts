import bpc157Card from "@assets/BPC-157_card_v4_1771603843201.PNG";
import cjc1295Card from "@assets/CJC-1295_card_v4_1771603843200.PNG";
import hexarelinCard from "@assets/Hexarelin_card_v4_1771603843199.PNG";
import motscCard from "@assets/MOTS-c_card_v4_1771603843198.PNG";
import pt141Card from "@assets/PT-141_card_v4_1771603843199.PNG";
import sermorelinCard from "@assets/Sermorelin_card_v4_1771603843199.PNG";
import tesamorelinCard from "@assets/Tesamorelin_card_v4_1771603843199.PNG";
import igf1lr3Card from "@assets/IGF-1_LR3_card_v4_1771603843200.PNG";
import ghkcuCard from "@assets/GHK-Cu_card_v4_1771603843200.PNG";
import mk677Card from "@assets/MK-677_card_v4_1771603843200.PNG";
import ipamorelinCard from "@assets/Ipamorelin_card_v4_1771603843200.PNG";
import retatrutideCard from "@assets/Retatrutide_card_v4_1771603843200.PNG";
import tirzepatideCard from "@assets/Tirzepatide_card_v4_1771603843200.PNG";
import tb500Card from "@assets/TB-500_card_v4_1771603843201.PNG";
import semaglutideCard from "@assets/Semaglutide_card_v4_1771603843201.PNG";
import epithalonCard from "@assets/Epithalon_card_1771604454710.PNG";
import thymosinAlpha1Card from "@assets/Thymosin_Alpha1_card_1771604454711.PNG";
import nadCard from "@assets/NAD_card_1771604454711.PNG";
import melanotan2Card from "@assets/Melanotan_II_card_1771604454711.PNG";
import kpvCard from "@assets/KPV_card_1771604454711.PNG";

const productImageOverrides: Record<string, string> = {
  "bpc157-5mg": bpc157Card,
  "cjc1295-nodac-5mg": cjc1295Card,
  "hexarelin-2mg": hexarelinCard,
  "motsc-10mg": motscCard,
  "pt141-10mg": pt141Card,
  "sermorelin-5mg": sermorelinCard,
  "tesamorelin-10mg": tesamorelinCard,
  "igf1lr3-1mg": igf1lr3Card,
  "ghkcu-50mg": ghkcuCard,
  "mk677-25mg": mk677Card,
  "ipamorelin-5mg": ipamorelinCard,
  "retatrutide-10mg": retatrutideCard,
  "tirzepatide-10mg": tirzepatideCard,
  "tb500-10mg": tb500Card,
  "semaglutide-5mg": semaglutideCard,
  "epithalon-10mg": epithalonCard,
  "thymosin-alpha1-5mg": thymosinAlpha1Card,
  "nad-100mg": nadCard,
  "melanotan2-10mg": melanotan2Card,
  "kpv-10mg": kpvCard,
};

export function getProductImage(productId: string, fallbackUrl: string): string {
  return productImageOverrides[productId] || fallbackUrl;
}
