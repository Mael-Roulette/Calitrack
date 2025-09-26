import Image from "next/image"
import { Milestone } from "@/types"

const RoadmapItem = ( { icon, title, description }: Milestone ) => {
  return (
    <li className="relative w-full mb-6 sm:mb-0" >
      <div className="flex items-center">
        <div className="flex items-center justify-center p-3 bg-background rounded-full border border-secondary">
          <Image
            src={ `/icons/${icon}` }
            alt={ title }
            width={ 35 }
            height={ 35 }
          />
        </div>
        <div className="w-full bg-secondary h-0.5"></div>
      </div>
      <div className="mt-3 ">
        <h3 className="text-lg font-calsans">{ title }</h3>
        <p>{ description }</p>
      </div>
    </li >
  )
}

export default function Roadmap ( { milestones }: { milestones: Milestone[] } ) {
  return (
    <ol className=" w-full items-start gap-8 sm:flex">
      { milestones.map( ( milestone, index ) => (
        <RoadmapItem
          key={ milestone.id || index }
          id={ milestone.id }
          icon={ milestone.icon }
          title={ milestone.title }
          description={ milestone.description }
        />
      ) ) }
    </ol>
  )
}