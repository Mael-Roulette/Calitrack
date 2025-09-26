'use client'

import { FaqData, FaqProps } from '@/types'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import React, { useCallback, useState } from 'react'

// Composant FAQ Item
const FaqItem: React.FC<{
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}> = ( { question, answer, isOpen, onToggle } ) => {
  return (
    <div className="border-b border-foreground/30 py-3">
      <button
        onClick={ onToggle }
        className="flex items-center justify-between w-full text-left group hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary rounded-lg"
        aria-expanded={ isOpen }
      >
        <span className="title-card px-4 py-2 font-semibold">
          { question }
        </span>
        <ChevronDownIcon
          className={ `h-6 w-6 text-foreground transition-transform duration-200 flex-shrink-0 mr-4 ${isOpen ? 'rotate-180' : ''
            }` }
        />
      </button>

      <div
        className={ `overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }` }
      >
        <div className="text-foreground/85 leading-relaxed pl-4 pb-4">
          { answer }
        </div>
      </div>
    </div>
  )
}

// Composant FAQ principal
const Faq: React.FC<FaqProps> = ( {
  faqs,
  allowMultipleOpen = true
} ) => {
  const [ openItems, setOpenItems ] = useState<Set<number>>( new Set() )

  const handleToggle = useCallback( ( index: number ) => {
    setOpenItems( prev => {
      const newSet = new Set( prev )

      if ( allowMultipleOpen ) {
        // Mode multiple
        if ( newSet.has( index ) ) {
          newSet.delete( index )
        } else {
          newSet.add( index )
        }
      } else {
        // Mode accordéon (un seul ouvert)
        if ( newSet.has( index ) ) {
          newSet.clear()
        } else {
          newSet.clear()
          newSet.add( index )
        }
      }

      return newSet
    } )
  }, [ allowMultipleOpen ] )

  if ( !faqs?.length ) {
    return null
  }

  return (
    <div className="space-y-0">
      { faqs.map( ( faq, index ) => (
        <FaqItem
          key={ faq.id || index }
          question={ faq.question }
          answer={ faq.answer }
          isOpen={ openItems.has( index ) }
          onToggle={ () => handleToggle( index ) }
        />
      ) ) }
    </div>
  )
}

export default Faq
export type { FaqData, FaqProps }
