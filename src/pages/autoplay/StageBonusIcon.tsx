import { Badge, Tooltip } from '@material-ui/core';
import { ReactComponent as EnergyImmuneIcon } from '../../assets/images/energyImmune.svg';
import { ReactComponent as PhysicalImmuneIcon } from '../../assets/images/physicalImmune.svg';
import { ReactComponent as NEImmuneIcon } from '../../assets/images/nonelementalImmune.svg';
import { ReactComponent as ReflectIcon } from '../../assets/images/reflect.svg';
import { Stage } from '../../types';

const ENERGY_IMMUNE = 'energyimmune';
const PHYSICAL_IMMUNE = 'physicalimmune';
const NONELEM_IMMUNE = 'enemyitnd';
const REFLECT_HERO = 'reflecthero';
const REFLECT_VILLIAN = 'reflectvillian';

const StageBonusIcon = ({ stage }: { stage: Stage }) => {
  if (stage.bonus === undefined) {
    return null;
  }

  if (stage.bonus.indexOf(ENERGY_IMMUNE) >= 0) {
    return (
      <Tooltip title={'Enemy Immunity to Energy Damage'}>
        <EnergyImmuneIcon width={'24'} height={'24'} />
      </Tooltip>
    );
  }
  if (stage.bonus.indexOf(PHYSICAL_IMMUNE) >= 0) {
    return (
      <Tooltip title={'Enemy Immunity to Physical Damage'}>
        <PhysicalImmuneIcon width={'24'} height={'24'} />
      </Tooltip>
    );
  }
  if (stage.bonus.indexOf(NONELEM_IMMUNE) >= 0) {
    return (
      <Tooltip title={'Enemy Immunity to non-elemental Damage'}>
        <NEImmuneIcon width={'24'} height={'24'} />
      </Tooltip>
    );
  }
  if (stage.bonus.indexOf(REFLECT_HERO) >= 0) {
    return (
      <Badge variant={'dot'} color={'primary'} overlap={'circle'}>
        <Tooltip title={'Reflect damage from Heroes'}>
          <ReflectIcon width={'24'} height={'24'} />
        </Tooltip>
      </Badge>
    );
  }
  if (stage.bonus.indexOf(REFLECT_VILLIAN) >= 0) {
    return (
      <Badge variant={'dot'} color={'secondary'} overlap={'circle'}>
        <Tooltip title={'Reflect damage from Villians'}>
          <ReflectIcon width={'24'} height={'24'} />
        </Tooltip>
      </Badge>
    );
  }
  return null;
};
export default StageBonusIcon;
