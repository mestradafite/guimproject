
export interface CampaignOptions {
    instStry?: {visible: boolean, validated: boolean}; 
    instPost?: {visible: boolean, validated: boolean}; 
    blogProd?: {visible: boolean, validated: boolean};  
    blogBrand?: {visible: boolean, validated: boolean};  
    cupon?: {visible: boolean, validated: boolean, cuponId: string};  
    ytbInit?: {visible: boolean, validated: boolean};  
    ytbDuring?: {visible: boolean, validated: boolean};  
    ytbAll?: {visible: boolean, validated: boolean}; 
    twtOne?: {visible: boolean, validated: boolean};  
    tikOnePost?: {visible: boolean, validated: boolean};  
    fcbkPost?: {visible: boolean, validated: boolean}; 
    sizes?: string;
  }