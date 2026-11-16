import CourseList from './components/CourseList.jsx';

export default function App() {
  return (
    <main className="page">
      <header className="hero">
        <div><p className="topline">2026-2 OSS · WEEK 11 · ASSIGN 11</p><h1>나의 교과목 관리</h1><p className="subtitle">이번학기 과목을 등록하고, 완료 여부를 체크하는 앱</p></div>
        <span className="tag">2026 FALL</span>
      </header>
      <CourseList />
      <footer className="bottom"><span>OSS Week 11 · React</span><span>Local state only · Refresh resets data</span></footer>
    </main>
  );
}
