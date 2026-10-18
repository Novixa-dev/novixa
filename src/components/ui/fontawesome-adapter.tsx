import React from 'react';
import type { IconBaseProps } from 'react-icons';
import {
  FaUniversalAccess,
  FaChartLine,
  FaCircleExclamation,
  FaTriangleExclamation,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaArrowTrendUp,
  FaAward,
  FaChartColumn,
  FaBookOpen,
  FaRobot,
  FaBox,
  FaBoxesStacked,
  FaBriefcase,
  FaBug,
  FaBuilding,
  FaCalculator,
  FaCalendar,
  FaCalendarCheck,
  FaCalendarDays,
  FaCheck,
  FaCircleCheck,
  FaCircleDot,
  FaClock,
  FaCloud,
  FaCloudArrowUp,
  FaCode,
  FaTableColumns,
  FaCompass,
  FaCopy,
  FaArrowTurnDown,
  FaMicrochip,
  FaDatabase,
  FaDownload,
  FaUpRightFromSquare,
  FaFileLines,
  FaFilter,
  FaFlag,
  FaFlask,
  FaGamepad,
  FaCodeBranch,
  FaCodeCommit,
  FaGithub,
  FaGlobe,
  FaGraduationCap,
  FaHardDrive,
  FaHeadphones,
  FaHandshake,
  FaHeartPulse,
  FaCircleQuestion,
  FaHouse,
  FaInbox,
  FaCircleInfo,
  FaLanguage,
  FaLaptop,
  FaLayerGroup,
  FaGaugeHigh,
  FaGrip,
  FaLifeRing,
  FaLinkedin,
  FaSpinner,
  FaLock,
  FaRightFromBracket,
  FaEnvelope,
  FaLocationDot,
  FaBars,
  FaComments,
  FaBoxArchive,
  FaPalette,
  FaPhone,
  FaChartPie,
  FaPlus,
  FaQuoteLeft,
  FaRotate,
  FaRocket,
  FaRotateLeft,
  FaRuler,
  FaScaleBalanced,
  FaScroll,
  FaMagnifyingGlass,
  FaPaperPlane,
  FaServer,
  FaShareNodes,
  FaShield,
  FaShieldHalved,
  FaSliders,
  FaStar,
  FaStethoscope,
  FaStore,
  FaTable,
  FaTag,
  FaBullseye,
  FaTerminal,
  FaTrash,
  FaArrowTrendDown,
  FaTrophy,
  FaTruck,
  FaXTwitter,
  FaFont,
  FaUser,
  FaUserCheck,
  FaUsers,
  FaUtensils,
  FaDiagramProject,
  FaWrench,
  FaXmark,
  FaCircleXmark,
  FaBolt,
  FaWandMagicSparkles,
  FaGift,
  FaUserPlus,
  FaPercent,
  FaPenToSquare,
  FaDollarSign,
} from 'react-icons/fa6';

export interface LucideProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
  color?: string;
  strokeWidth?: string | number;
  className?: string;
}

export type LucideIcon = React.ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>;

function createFaIcon(FaComp: React.ComponentType<IconBaseProps>): LucideIcon {
  const IconComponent = React.forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
    const { strokeWidth: _sw, size, className, color, style, ...rest } = props;
    // Map props to react-icons format
    return (
      <FaComp
        // @ts-expect-error react-icons ref type
        ref={ref}
        size={size}
        color={color}
        className={className}
        style={style}
        {...rest}
      />
    );
  });
  IconComponent.displayName = `FontAwesome(${FaComp.name || 'Icon'})`;
  return IconComponent as LucideIcon;
}

// 116 Font Awesome 6 Drop-in Replacements
export const Accessibility = createFaIcon(FaUniversalAccess);
export const Activity = createFaIcon(FaChartLine);
export const AlertCircle = createFaIcon(FaCircleExclamation);
export const AlertTriangle = createFaIcon(FaTriangleExclamation);
export const ArrowLeft = createFaIcon(FaArrowLeft);
export const ArrowRight = createFaIcon(FaArrowRight);
export const ArrowUp = createFaIcon(FaArrowUp);
export const ArrowUpRight = createFaIcon(FaArrowTrendUp);
export const Award = createFaIcon(FaAward);
export const BarChart3 = createFaIcon(FaChartColumn);
export const BookOpen = createFaIcon(FaBookOpen);
export const Bot = createFaIcon(FaRobot);
export const Box = createFaIcon(FaBox);
export const Boxes = createFaIcon(FaBoxesStacked);
export const Briefcase = createFaIcon(FaBriefcase);
export const Bug = createFaIcon(FaBug);
export const Building = createFaIcon(FaBuilding);
export const Building2 = createFaIcon(FaBuilding);
export const Calculator = createFaIcon(FaCalculator);
export const Calendar = createFaIcon(FaCalendar);
export const CalendarCheck = createFaIcon(FaCalendarCheck);
export const CalendarClock = createFaIcon(FaCalendarCheck);
export const CalendarDays = createFaIcon(FaCalendarDays);
export const Check = createFaIcon(FaCheck);
export const CheckCircle2 = createFaIcon(FaCircleCheck);
export const CircleDot = createFaIcon(FaCircleDot);
export const Clock = createFaIcon(FaClock);
export const Cloud = createFaIcon(FaCloud);
export const CloudCheck = createFaIcon(FaCloudArrowUp);
export const Code2 = createFaIcon(FaCode);
export const Columns = createFaIcon(FaTableColumns);
export const Compass = createFaIcon(FaCompass);
export const Copy = createFaIcon(FaCopy);
export const CornerDownLeft = createFaIcon(FaArrowTurnDown);
export const Cpu = createFaIcon(FaMicrochip);
export const Database = createFaIcon(FaDatabase);
export const Download = createFaIcon(FaDownload);
export const ExternalLink = createFaIcon(FaUpRightFromSquare);
export const FileText = createFaIcon(FaFileLines);
export const Filter = createFaIcon(FaFilter);
export const Flag = createFaIcon(FaFlag);
export const FlaskConical = createFaIcon(FaFlask);
export const Gamepad = createFaIcon(FaGamepad);
export const Gamepad2 = createFaIcon(FaGamepad);
export const GitBranch = createFaIcon(FaCodeBranch);
export const GitCommit = createFaIcon(FaCodeCommit);
export const Github = createFaIcon(FaGithub);
export const Globe = createFaIcon(FaGlobe);
export const GraduationCap = createFaIcon(FaGraduationCap);
export const HardDrive = createFaIcon(FaHardDrive);
export const Headphones = createFaIcon(FaHeadphones);
export const HeartHandshake = createFaIcon(FaHandshake);
export const HeartPulse = createFaIcon(FaHeartPulse);
export const HelpCircle = createFaIcon(FaCircleQuestion);
export const Home = createFaIcon(FaHouse);
export const Inbox = createFaIcon(FaInbox);
export const Info = createFaIcon(FaCircleInfo);
export const Languages = createFaIcon(FaLanguage);
export const Laptop = createFaIcon(FaLaptop);
export const Layers = createFaIcon(FaLayerGroup);
export const LayoutDashboard = createFaIcon(FaGaugeHigh);
export const LayoutGrid = createFaIcon(FaGrip);
export const LifeBuoy = createFaIcon(FaLifeRing);
export const Linkedin = createFaIcon(FaLinkedin);
export const Loader2 = createFaIcon(FaSpinner);
export const Lock = createFaIcon(FaLock);
export const LogOut = createFaIcon(FaRightFromBracket);
export const Mail = createFaIcon(FaEnvelope);
export const MapPin = createFaIcon(FaLocationDot);
export const Menu = createFaIcon(FaBars);
export const MessageSquare = createFaIcon(FaComments);
export const Package = createFaIcon(FaBox);
export const PackageCheck = createFaIcon(FaBoxArchive);
export const Palette = createFaIcon(FaPalette);
export const Phone = createFaIcon(FaPhone);
export const PieChart = createFaIcon(FaChartPie);
export const Plus = createFaIcon(FaPlus);
export const Quote = createFaIcon(FaQuoteLeft);
export const RefreshCw = createFaIcon(FaRotate);
export const Rocket = createFaIcon(FaRocket);
export const RotateCcw = createFaIcon(FaRotateLeft);
export const Ruler = createFaIcon(FaRuler);
export const Scale = createFaIcon(FaScaleBalanced);
export const ScrollText = createFaIcon(FaScroll);
export const Search = createFaIcon(FaMagnifyingGlass);
export const Send = createFaIcon(FaPaperPlane);
export const Server = createFaIcon(FaServer);
export const Share2 = createFaIcon(FaShareNodes);
export const Shield = createFaIcon(FaShield);
export const ShieldAlert = createFaIcon(FaShieldHalved);
export const ShieldCheck = createFaIcon(FaShieldHalved);
export const Sliders = createFaIcon(FaSliders);
export const Star = createFaIcon(FaStar);
export const Stethoscope = createFaIcon(FaStethoscope);
export const Store = createFaIcon(FaStore);
export const Table2 = createFaIcon(FaTable);
export const Tag = createFaIcon(FaTag);
export const Target = createFaIcon(FaBullseye);
export const Terminal = createFaIcon(FaTerminal);
export const Trash2 = createFaIcon(FaTrash);
export const TrendingDown = createFaIcon(FaArrowTrendDown);
export const TrendingUp = createFaIcon(FaArrowTrendUp);
export const Trophy = createFaIcon(FaTrophy);
export const Truck = createFaIcon(FaTruck);
export const Twitter = createFaIcon(FaXTwitter);
export const Type = createFaIcon(FaFont);
export const User = createFaIcon(FaUser);
export const UserCheck = createFaIcon(FaUserCheck);
export const Users = createFaIcon(FaUsers);
export const Utensils = createFaIcon(FaUtensils);
export const UtensilsCrossed = createFaIcon(FaUtensils);
export const Workflow = createFaIcon(FaDiagramProject);
export const Wrench = createFaIcon(FaWrench);
export const X = createFaIcon(FaXmark);
export const XCircle = createFaIcon(FaCircleXmark);
export const Zap = createFaIcon(FaBolt);
export const Handshake = createFaIcon(FaHandshake);
export const Sparkles = createFaIcon(FaWandMagicSparkles);
export const Gift = createFaIcon(FaGift);
export const UserPlus = createFaIcon(FaUserPlus);
export const Percent = createFaIcon(FaPercent);
export const Edit2 = createFaIcon(FaPenToSquare);
export const DollarSign = createFaIcon(FaDollarSign);
