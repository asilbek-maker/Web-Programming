// E3: an optional prop with a default value.
// The default avatar is an inline SVG data URL, so it never depends on an
// outside image host.
const DEFAULT_AVATAR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<rect width="64" height="64" rx="32" fill="#2f5d50"/>' +
      '<circle cx="32" cy="25" r="11" fill="#e3ede8"/>' +
      '<path d="M12 54c3-11 12-16 20-16s17 5 20 16" fill="#e3ede8"/>' +
      '</svg>',
  )

function ProfileCard({ name, role, email, avatarUrl = DEFAULT_AVATAR }) {
  return (
    <div className="card row" style={{ alignItems: 'flex-start' }}>
      <img src={avatarUrl} alt="" width="56" height="56" style={{ borderRadius: '50%' }} />
      <div>
        <h3>{name}</h3>
        <p className="muted small">{role}</p>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </div>
  )
}

function ProfileCardDemo() {
  return (
    <div className="grid-cards">
      <ProfileCard
        name="Asilbek"
        role="Student developer"
        email="asilbek@example.com"
        avatarUrl={`${import.meta.env.BASE_URL}favicon.svg`}
      />
      {/* no avatarUrl given, so the default is used */}
      <ProfileCard name="Teaching Assistant" role="Web Programming TA" email="ta@example.com" />
    </div>
  )
}

export default ProfileCardDemo
