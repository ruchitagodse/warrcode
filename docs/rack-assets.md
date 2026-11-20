# Shop the Rack — cutout provenance and prompts

The rack presents six existing catalogue products: cream-crew, rust-crew, burgundy-long-sleeve, code-tee, statement-coat and espresso-trousers. It uses AI-assisted, photo-derived **demo display cutouts**, not new stock items or supplier-approved packshots. Original supplied photographs remain unchanged and appear in product quick view. The partially hidden right sleeve of the rust crewneck was visually completed for the display; it is an approximation, not evidence of garment specifications. The tobacco tee keeps an asymmetric, tucked presentation from the original photograph.

## Saved assets

- `public/images/rack/cream-crew.webp`: derived from `public/images/cream-crew.webp`, originally cropped from `public/81695.jpg`.
- `public/images/rack/rust-crew-cutout.webp`: derived from the rust sweatshirt in `public/81695.jpg`; a second editing pass completed the occluded sleeve.
- `public/images/rack/tobacco-tee.webp`: derived from `public/images/code-tee.webp`, originally cropped from `public/81700.jpg`.

All six preserve alpha transparency and were optimized as WebP at quality 88, alpha quality 100, with maximum dimensions 620×820. Their combined file size is about 308 KB. Originals and full-resolution imagegen outputs were retained. No generated rack artwork replaces product-card or quick-view photographs.

- `public/images/rack/burgundy-long-sleeve.webp`: derived from `public/images/burgundy-long-sleeve.webp`, originally cropped from `public/t2.jpeg`.
- `public/images/rack/statement-coat.webp`: derived from `public/images/statement-coat.webp`, originally supplied as `public/81698.jpg`.
- `public/images/rack/espresso-trousers.webp`: derived from `public/images/espresso-trousers.webp`, originally cropped from `public/81697.jpg`.

The three added cutouts are illustrative extractions/pose continuations from photographs worn by models. Occluded edges, waistband and hanging pose are approximated for display; no inferred construction is asserted as a verified product specification.

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


### Burgundy long-sleeve

Use case: background-extraction / photo-derived website demo cutout. Isolate ONLY the actual burgundy WARRCODE long-sleeve top in the supplied client photograph. Remove the man, head, sunglasses, hands, watch, trousers, background and surrounding graphics. Preserve the photographed burgundy colour, crew neckline, fine fabric, visible folds, long sleeves and small existing WC chest logo. The sleeves may be relaxed slightly into a hanging pose only where needed for a coherent display cutout; infer minimal obscured material, no new garment design or details. No new slogans, pockets, zip, price tag or hanger. Entire garment visible, centered with transparent padding. Fully transparent background. Original supplied photograph remains the product-detail reference; this is an illustrative rack-display cutout of that same garment.

### Statement overcoat

Use case: background-extraction / photo-derived website demo cutout. Extract ONLY the chartreuse yellow-green WARRCODE long overcoat shown in the client photograph. Preserve its actual distinctive colour, long hem, wide lapels, double-breasted dark buttons, pocket positions, visible seams and small WC chest mark. Remove the model's head, hair, hands, handbag, black shirt, black trousers, boots, pavement and building. Show the same coat isolated in the photographed front/three-quarter presentation, allowing an open transparent centre; retain its full length and sleeves. Make only minimal coherent continuation at occluded edges for a website display cutout, not a new garment. No hanger, text, extra buttons, new logo or accessories. Transparent background with padding around the entire coat. This is a demo rack visual; original supplier photograph remains the shopping reference.

Final correction: Edit target: this chartreuse overcoat demo cutout. Two precise corrections only: (1) remove ALL coloured glow, halo, shadow and background pixels outside the coat silhouette; all exterior space must have alpha zero, with crisp natural garment edges on genuinely transparent background, no black or yellow backdrop. (2) Remove the extra small WC embroidery from the folded sleeve cuff; retain only the existing chest WC logo. Preserve the coat colour, lapels, silhouette, all actual dark buttons and garment details. Do not add anything else or generate a new coat. Entire coat remains fully visible with transparent padding.

### Espresso trousers

Use case: background-extraction / photo-derived website demo cutout. Isolate ONLY the espresso-brown relaxed trousers in the supplied WARRCODE outfit crop. Preserve the photographed brown colour, light cream side stripe, loose legs, visible fabric folds and gathered ankles. Remove the white sneakers, skin, background and cropped top. Preserve the actual trousers design; infer only minimal waistband continuation where the top occludes it so the whole trouser can hang plausibly. No added logos, drawstrings, pockets, new styling or hanger. Center both full trouser legs, waistband to cuffs, on a genuinely transparent background with modest padding. Illustrative website rack cutout from this real supplied photo; not a new product or an assertion of hidden construction details.
