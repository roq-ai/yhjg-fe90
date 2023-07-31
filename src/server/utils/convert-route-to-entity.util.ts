const mapping: Record<string, string> = {
  examinations: 'examination',
  fees: 'fee',
  'it-staffs': 'it_staff',
  organizations: 'organization',
  students: 'student',
  teachers: 'teacher',
  timetables: 'timetable',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
