import Image from "next/image";

export default function FeatureCard ( { icon, title, description }: { icon: string, title: string, description: string } ) {
  return (
    <div className="bg-secondary/20 p-5 rounded-md max-w-xs h-full flex flex-col justify-start items-center">
      <div className="rounded-full p-4 bg-background mb-2">
        <Image
          src={ `/icons/${icon}` }
          width={ 40 }
          height={ 40 }
          alt={ title }
        />
      </div>
      <h3 className="font-calsans text-center text-lg mb-2">{ title }</h3>
      <p className="text-center">{ description }</p>
    </div>
  )
}