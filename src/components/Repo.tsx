interface RepoProps {
  id?: number;
  assignment: string;
  repoUrl: string;
  assignmentUrl: number;
  deleteIcon?: boolean;
  onClick?: (e: any) => void;
}

export const Repo = ({ id, assignment, repoUrl, assignmentUrl, deleteIcon }: RepoProps) => {
  const classes = `text-left leading-relaxed mb-2 w-full text-black bg-gray-100 py-2 md:w-129 py-2`;

  return (
    <div className={classes}>
      <div className="px-4 pt-1">
        <h1 className="text-lg font-bold font-poppins">{assignment}</h1>
      </div>
      <div className="px-4 py-1">
        <div className="text-md font-roboto">
          <a href={`/assignments/${assignmentUrl}`}>Assignment</a> |{' '}
          <a href={repoUrl}>Repository</a>
        </div>
      </div>
    </div>
  );
};
