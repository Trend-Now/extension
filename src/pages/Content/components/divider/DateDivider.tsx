export default function DateDivider() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return (
    <div className="date-divider">
      <span className="date-divider__date">{`${year}년 ${month}월 ${day}일`}</span>
      <hr className="date-divider__line" />
      <span className="date-divider__square" />
    </div>
  );
}
