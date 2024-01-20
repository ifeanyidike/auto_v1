import React, {
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { type MenuEnum } from '../types/menu';

type ItemProps = {
  title: MenuEnum;
  Icon: ReactNode;
  isSelected: boolean;
  isCollapsed: boolean;
  setIsSelected: Dispatch<SetStateAction<MenuEnum | null>>;
};
const MenuItem = (props: ItemProps) => (
  <button
    onClick={() => props.setIsSelected(props.title)}
    className={`flex  max-md:justify-center gap-2 py-5 px-5 max-md:px-0 text-gray-500 ${
      !props.isCollapsed ? 'px-5' : 'px-0 justify-center'
    }
    ${props.isSelected && !props.isCollapsed ? 'pl-4' : '-pl-4'}
    hover:bg-content-normal/5 hover:text-content-normal hover:font-medium
    ${
      props.isSelected &&
      'border-l-4 border-content-normal bg-content-normal/5 text-content-normal font-medium'
    }`}
  >
    {props.Icon}{' '}
    {!props.isCollapsed && (
      <span className="text-sm max-md:hidden">{props.title}</span>
    )}
  </button>
);

export default MenuItem;