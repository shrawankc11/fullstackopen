const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  const Course = (props) => {
    const { course } = props;

    const Header = ({ course }) => {
      return <h1> {course.name} </h1>;
    };

    const Part = ({ part, exercise }) => {
      return (
        <p>
          {part} {exercise}
        </p>
      );
    };

    const Content = ({ course }) => {
      return (
        <>
          {course.parts.map((part) => (
            <Part key={part.id} part={part.name} exercise={part.exercises} />
          ))}
        </>
      );
    };

    const Total = ({ course }) => {
      return (
        <p>
          total exercises:{" "}
          {course.parts.reduce(
            (previousValue, currenValue) =>
              previousValue + currenValue.exercises,
            0
          )}
        </p>
      );
    };

    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    );
  };

  return (
    <>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  );
};

export default App;