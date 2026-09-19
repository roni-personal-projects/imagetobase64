export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is base64 encoding?",
    answer: "Base64 encoding is a binary-to-text algorithm that converts raw binary image data into an ASCII text string. This allows images to be embedded directly into HTML, CSS, JSON, or code files without relying on external file storage or separate HTTP requests."
  },
  {
    question: "Why is my base64 string larger than the original image?",
    answer: "Base64 encoding represents 3 bytes of binary data using 4 ASCII characters, which inherently adds approximately 33% overhead to the file size. For example, a 100 KB image file will result in a base64 string of roughly 133 KB."
  },
  {
    question: "When should I use base64 encoding?",
    answer: "You should use base64 encoding for small images, icons, logos, email templates, design prototypes, or offline applications where reducing HTTP network requests or embedding self-contained images outweighs the 33% size increase."
  },
  {
    question: "Can I decode base64 back to an image?",
    answer: "Yes! Our tool provides full two-way conversion. You can switch to the 'Base64 to Image' tab, paste any valid base64 data URI or raw string, and instantly preview and download the reconstructed image file."
  },
  {
    question: "What image formats are supported?",
    answer: "We support all major web and system image formats including PNG, JPEG / JPG, WebP, SVG, GIF, BMP, ICO, TIFF, AVIF, and HEIC."
  },
  {
    question: "How many files can I upload at once?",
    answer: "Our converter operates 100% client-side in your browser, meaning you can convert images one by one or paste them instantly via clipboard without artificial batch queues or wait times."
  },
  {
    question: "What does the \"Compress\" option do?",
    answer: "The compression feature optimizes image canvas data prior to base64 encoding, stripping unneeded metadata and applying canvas optimization to minimize the final base64 string size."
  },
  {
    question: "Can I resize images before encoding?",
    answer: "Yes, you can adjust image dimensions directly in the browser preview before generating the base64 code snippet, ensuring your encoded string is as compact as possible."
  },
  {
    question: "Are my files stored permanently?",
    answer: "No. Your files are never uploaded to any server or stored anywhere. All processing happens locally in your browser's memory using the HTML5 FileReader API. Once you close or refresh the page, all data is gone."
  },
  {
    question: "Is base64 encoding secure?",
    answer: "Base64 is an encoding format, not encryption. While it makes binary data readable as text, it does not hide or encrypt secrets. Since our tool processes files entirely on your device, your private images remain 100% secure from interception."
  },
  {
    question: "Is this service GDPR compliant?",
    answer: "Yes, 100%. Because we do not collect, process, transfer, or store any personal data or uploaded images on external servers, the service is fully GDPR compliant by design."
  },
  {
    question: "How do I use base64 in HTML?",
    answer: "In HTML, use the base64 data URI directly inside the src attribute of an <img> tag: <img src=\"data:image/png;base64,iVBORw0KGgo...\" alt=\"Embedded Image\" />."
  },
  {
    question: "How do I use base64 as a CSS background?",
    answer: "In CSS, pass the base64 data URI into the url() function: .my-element { background-image: url('data:image/png;base64,iVBORw0KGgo...'); }."
  },
  {
    question: "How do I use base64 images in emails?",
    answer: "Embed the base64 data URI into your HTML email body tags (<img src=\"data:image/png;base64,...\">). This ensures your images display immediately in email clients without being blocked as external remote content."
  },
  {
    question: "What browsers support base64 images?",
    answer: "All modern web browsers — including Chrome, Safari, Firefox, Edge, Opera, iOS Safari, and Android Chrome — fully support base64 data URIs in HTML, CSS, and JavaScript."
  },
  {
    question: "Is there an API available?",
    answer: "Because base64 encoding is performed natively in JavaScript (using FileReader or canvas.toDataURL()), you don't need a remote REST API. You can use standard browser APIs or client-side packages directly in your app."
  },
  {
    question: "Is this service free?",
    answer: "Yes, ImageToBase64.dpdns.org is 100% free with no registration, no subscription, no usage caps, and no hidden fees."
  }
];
