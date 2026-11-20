# Shop the Rack — cutout provenance and prompts

The rack presents three existing catalogue products: cream-crew, rust-crew and code-tee. It uses AI-assisted, photo-derived **demo display cutouts**, not new stock items or supplier-approved packshots. Original supplied photographs remain unchanged and appear in product quick view. The partially hidden right sleeve of the rust crewneck was visually completed for the display; it is an approximation, not evidence of garment specifications. The tobacco tee keeps an asymmetric, tucked presentation from the original photograph.

## Saved assets

- `public/images/rack/cream-crew.webp`: derived from `public/images/cream-crew.webp`, originally cropped from `public/81695.jpg`.
- `public/images/rack/rust-crew-cutout.webp`: derived from the rust sweatshirt in `public/81695.jpg`; a second editing pass completed the occluded sleeve.
- `public/images/rack/tobacco-tee.webp`: derived from `public/images/code-tee.webp`, originally cropped from `public/81700.jpg`.

All three preserve alpha transparency and were optimized as WebP at quality 88, alpha quality 100, with maximum dimensions 620×820. Their combined file size is about 158 KB. Originals and full-resolution imagegen outputs were retained. No generated rack artwork replaces product-card or quick-view photographs.

## Tool

Built-in imagegen edit mode, with `transparent_background: true`. No external stock photography, CLI fallback, API credentials or new runtime dependencies were used.

## Prompt set

### Cream

Use case: background-extraction. Edit target: the supplied exact photograph of a cream WARRCODE crewneck sweatshirt. Remove only the background and the black hanger. Keep the visible cream garment pixels, silhouette, folds, ribbing, neckline and existing small WC chest mark faithful to the input. Do not redesign, recolour, add details, make new product photography, add a model, or invent new logos. Isolate just the actual sweatshirt as a clean transparent-background cutout. Preserve the photographed front view and full visible sleeves and hem. Center the cutout with modest transparent padding. The result is a website cutout derived from this exact client garment, not a new garment design.

### Rust — initial extraction

Use case: background-extraction. Edit target: ONLY the rust orange WARRCODE sweatshirt on the LEFT in the supplied campaign photo. Extract this exact rust garment, removing the cream garment, hanger, background, surrounding promotional typography and black margins. Preserve the rust sweatshirt's exact colour, visible neckline, ribbing, folds and small WC chest mark. IMPORTANT keep the supplied photographed view and visible silhouette; do not redesign or invent a replacement garment. Where the right edge is occluded by the cream sweatshirt, use a clean cropped/transparent edge rather than hallucinating a new sleeve. No hanger, new text, model or new details. Transparent background with modest padding.

### Rust — final display completion

Use case: precise-object-edit / photo-derived demo cutout. Image 1 is the edit target: the rust WARRCODE sweatshirt cutout with its right sleeve missing because of occlusion in the original supplied campaign. Image 2 is the original reference showing the rust and cream garments. Complete ONLY the missing right sleeve and right garment edge for a coherent hanging-garment DEMO presentation, matching the visible left sleeve's construction, rust colour, ribbed cuff, light and fabric. Keep all existing rust body pixels, neckline, folds, hem and WC chest mark unchanged as closely as possible. Do not create a new garment style, new details, zipper, pocket or new text. Same photographed rust crewneck; visually infer only the occluded continuation. No hanger. Entire completed sweatshirt must fit with transparent padding. Fully transparent background. This is an approximate display cutout for an interactive website; the original photograph remains the product-detail reference.

### Tobacco tee

Use case: background-extraction. Edit target: ONLY the actual tobacco brown WARRCODE oversized T-shirt worn in the supplied photo. Remove the woman, skin, arms, hair, sunglasses, cream trousers and background. Keep the exact visible T-shirt colour, logo, sleeve wording, fabric folds, loose silhouette and tucked/asymmetric hem as photographed. Preserve the existing photographed garment; do NOT create a new flat-lay product, alter fit, straighten folds, add a hanger, repaint logos or invent obscured fabric. Regions outside the visible shirt must be transparent. Isolated clean alpha cutout of the real photographed shirt only, centered with modest transparent padding.
