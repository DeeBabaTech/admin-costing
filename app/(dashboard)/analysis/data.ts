export default function getAnalysis(trips: any[]) {
  const totalTrips = trips.reduce(
    (total, team) => total + team.trips.length,
    0
  );

  const teamsWithTotals = trips.map((team) => ({
    ...team,
    totalEstimatedCost: team.trips.reduce(
      (sum: number, trip: any) => sum + trip.estimatedCost,
      0
    ),
  }));

  const grandTotal = teamsWithTotals.reduce(
    (sum, team) => sum + team.totalEstimatedCost,
    0
  );
  return { totalTrips, teamsWithTotals, grandTotal };
}
