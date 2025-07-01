import { useState } from 'react'

interface InteractiveAvatarProps {
    className?: string
    alt?: string
    images: string[]
}

export default function InteractiveAvatar({ className = '', alt = "Tolu's avatar", images }: InteractiveAvatarProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)

    const handleImageClick = () => {
        setIsTransitioning(true)
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
            setIsTransitioning(false)
        }, 150) // Half of the transition time for smooth fade
    }

    return (
        <div className="relative">
            <img
                src={images[currentImageIndex]}
                alt={alt}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 object-cover ${className} ${
                    isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
                onClick={handleImageClick}
                draggable="false"
                loading="eager"
            />
            {/* Image counter dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex 
                                ? 'bg-blue-500 scale-125' 
                                : 'bg-white/60 hover:bg-white/80'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}