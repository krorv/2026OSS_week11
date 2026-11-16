import { useState } from 'react';
import CourseItem from './CourseItem.jsx';
import { initialCourses } from '../data/courses.js';

export default function CourseList() {
  // [제공] 초기 배열을 useState로 관리합니다.
  const [courses, setCourses] = useState(initialCourses);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');

  // [제공] 삭제 기능: filter로 새 배열을 만들어 업데이트합니다.
  function handleDelete(id) {
    if (!window.confirm('이 과목을 삭제하시겠습니까?')) return;
    setCourses(previous => previous.filter(course => course.id !== id));
  }

  // 필수 기능 ①: 과목 등록
  function handleAdd(event) {
    event.preventDefault();
    const name = newName.trim();
    if (name === '') {
      setError('과목명을 입력해주세요.');
      return;
    }
    const newCourse = { id: Date.now(), name: name, category: 'Major', completed: false };
    setCourses(previous => [...previous, newCourse]);
    setNewName('');
    setError('');
  }

  // 필수 기능 ②: 완료/미완료 상태 변경
  function handleToggle(id) {
    setCourses(previous =>
      previous.map(course =>
        course.id === id ? { ...course, completed: !course.completed } : course
      )
    );
  }

  // 선택 기능: 과목명 검색
  const searchedCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchText.trim().toLowerCase())
  );

  const doneCount = courses.filter(course => course.completed).length;

  return (
    <>
      <section className="stats" aria-label="과목 통계">
        <div className="stat"><span>전체 과목</span><strong>{courses.length}</strong></div>
        <div className="stat"><span>완료</span><strong className="green">{doneCount}</strong></div>
        <div className="stat"><span>진행 중</span><strong className="blue">{courses.length - doneCount}</strong></div>
      </section>
      <section className="panel">
        <div className="panel-header"><h2>My Courses</h2><span className="small-note">{courses.length} courses</span></div>
        <form className="add-form" onSubmit={handleAdd}>
          <input className="input" value={newName} onChange={event => { setNewName(event.target.value); setError(''); }} placeholder="새 과목명을 입력하세요" aria-label="새 과목명" />
          <button className="btn primary" type="submit">+ Add Course</button>
        </form>
        {error && <p className="error">{error}</p>}
        <div className="tools">
          <input className="input" value={searchText} onChange={event => setSearchText(event.target.value)} placeholder="과목명 검색" aria-label="과목명 검색" />
        </div>
        <div className="list-head"><span>COURSE</span><span>CATEGORY</span><span>ACTIONS</span></div>
        {courses.length === 0 && <div className="empty">등록된 과목이 없습니다.</div>}
        {courses.length > 0 && searchedCourses.length === 0 && <div className="empty">검색 결과가 없습니다.</div>}
        {searchedCourses.map(course => (
          <CourseItem key={course.id} course={course} onDelete={handleDelete} onToggle={handleToggle} />
        ))}
      </section>
    </>
  );
}
