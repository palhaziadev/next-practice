import * as SolidIcons from '@heroicons/react/24/solid';
import * as OutlineIcons from '@heroicons/react/24/outline';
import styles from './Icon.module.scss';

export type IconName = keyof typeof SolidIcons | keyof typeof OutlineIcons;

// type from the HeroIcons package
type IconType = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>
>;

type IconProps = {
  name: IconName;
  className?: string;
  outline?: boolean;
} & Pick<React.SVGProps<SVGSVGElement>, 'stroke' | 'fill'>;

const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  outline = false,
  stroke,
  fill,
}) => {
  // TODO check if dynamic import is working correctly
  // const Icon: ComponentType<{ className: string }> = outline
  //   ? dynamic(() => import('@heroicons/react/24/outline').then((mod) => mod[name]))
  //   : dynamic(() => import('@heroicons/react/24/solid').then((mod) => mod[name]));

  // const Icon: ComponentType<{ className: string }> = outline ? OutlineIcons[name] : SolidIcons[name];
  const Icon: IconType = outline ? OutlineIcons[name] : SolidIcons[name];

  return (
    <div className={styles.iconContainer}>
      <Icon
        className={className}
        aria-hidden={true}
        stroke={stroke}
        fill={fill}
      />
    </div>
  );
};

export default Icon;
