import $ from './style.module.scss'
import { ArrowIcon } from '@/components/global/icons'
import React from 'react'
import classNames from 'classnames'

export interface ArrowBlockProps {
  className?: string
  noArrow?: boolean
  flat?: boolean
  customPadding?: boolean
  onClick?: () => void
}

export const ArrowBlock: React.FC<ArrowBlockProps> = ({
  className,
  noArrow = false,
  flat = false,
  children,
  customPadding = false,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        $['arrow-block'],
        className,
        !flat && $['unflat'],
        customPadding && $['custom-padding']
      )}
      onClick={onClick}
    >
      <div className={$['ab-body']}>{children}</div>
      {!noArrow && (
        <div className={$['ab-arrow-container']}>
          <ArrowIcon direction="right" className={$['ab-arrow']} />
        </div>
      )}
    </div>
  )
}
