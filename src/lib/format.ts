export const ghs = (amount: number) => new Intl.NumberFormat("en-GH", { style:"currency", currency:"GHS", maximumFractionDigits:0 }).format(amount);
export const toPesewas = (amount: number) => amount * 100;
export const slugify = (value:string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
