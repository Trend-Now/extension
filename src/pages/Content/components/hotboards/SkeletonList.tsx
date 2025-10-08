import SkeletonRow from './SkeletonRow';

export default function SkeletonList() {
  return (
    <div className="hotboards__list">
      {new Array(5).fill(0).map((_, index) => (
        <SkeletonRow key={index} />
      ))}
    </div>
  );
}
