type ImageProps = {
    src: string;
    alt: string;
};

export function Image({src, alt}: ImageProps) {

    return (
        <img 
            src={src} 
            alt={alt} 
            className="w-full h-64 object-cover rounded-lg w-full max-w-sm h-64 object-cover rounded-2xl shadow-lg border border-slate-200" />

    );
}

export default Image;