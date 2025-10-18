// A helper function to format match result objects for a consistent output.
export const mapMatchResultOutput = (result) => {
  return {
    sportName: result.sportName,
    category: result.category,
    matchName: result.matchName,
    college1: result.college1Name,
    college2: result.college2Name,
    point: result.point,
    collegeWon: result.collegeWon,
    editedBy: result.editedBy,
  };
};

// You can add other general utility functions to this file as needed.

