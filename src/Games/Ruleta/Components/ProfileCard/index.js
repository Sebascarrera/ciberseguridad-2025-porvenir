import './styles.css'

const ProfileCard = ({ character, name }) => {

  return (
    <div className="ScoreCardContainer">

      <div className="ScoreCardBackground p-3">

        { character &&
          <img
            className="ScoreCardImage"
            src={ character.image } />
        }

        { name && (
          <div className="ScoreCardInfo">
            <span className="is-size-4-mobile is-size-3 ScoreCardUserName">
              { name }
            </span>
          </div>
        )}

      </div>

    </div>
  )

}

export default ProfileCard
