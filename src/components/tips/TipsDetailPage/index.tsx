import { GetServerSideProps, NextPage } from 'next'

import $ from './style.module.scss'
import ApiHost from '@/modules/api-host'
import Body from '@/layouts/BaseLayout/Body'
import { Constants } from '@/constants'
import { GetTipDetail } from '@payw/eodiro-one-api/api/one/scheme'
import Information from '@/components/global/Information'
import { OneApiError } from '@payw/eodiro-one-api/api/one/types'
import RequireAuth from '@/components/global/RequireAuth'
import Time from '@/modules/time'
import { TipResponse } from '@payw/eodiro-one-api/database/models/tip'
import classNames from 'classnames'
import { getAccessToken } from '@/api'
import { oneApiClient } from '@payw/eodiro-one-api'
import { pathIds } from '@/config/paths'
import { redirect } from '@/modules/server/redirect'
import { useAuth } from '@/pages/_app'
import { useRouter } from 'next/router'

type ContentProps = {
  tip: TipResponse
}
const Content: React.FC<ContentProps> = ({ tip }) => {
  const authInfo = useAuth()
  const router = useRouter()
  const boardName = router.query.boardName

  async function deletePost() {
    // Confirm
    if (
      !confirm(
        '삭제된 포스트는 되돌릴 수 없으며 모든 댓글도 함께 삭제됩니다.\n정말 삭제하시겠습니까?'
      )
    )
      return

    // Delete
    // await oneApiClient(ApiHost.getHost(), {
    //   action: 'deletePost',
    //   data: {
    //     accessToken: (await Tokens.get()).accessToken,
    //     postId: tip.id,
    //   },
    // })

    alert('삭제되었습니다.')

    // Redirect to the list
    window.location.replace(`/square/${boardName}`)
  }

  return (
    <div>
      <div className={classNames($['post'], Constants.OVERLAY_SENTINEL_SPOT)}>
        <div className={$['info']}>
          <span className={$['author']}>{tip.randomNickname}</span>

          <span className={$['time']}>
            {Time.yyyymmddhhmmss(tip.createdAt, true)}
          </span>

          {tip.userId === authInfo.userId && (
            <span className={$['actions']}>
              <a
                href={`/square/${boardName}/${pathIds.writePost}?post_id=${tip.id}`}
              >
                <button className={$['edit']}>
                  <i className="f7-icons">pencil_outline</i>
                </button>
              </a>
              <button className={$['delete']} onClick={deletePost}>
                <i className="f7-icons">trash</i>
              </button>
            </span>
          )}
        </div>

        {/* Post title */}
        <h1 className={$['title']}>
          <span className="title-sentinel-spot">{tip.title}</span>
        </h1>

        {/* Post body */}
        {tip.body &&
          tip.body.split('\n').map((line, i) => {
            return line.length === 0 ? (
              <br key={`br-${i}`} className="line-break" />
            ) : (
              <p key={`p-${i}`} className={`paragraph-${i}`}>
                {line}
              </p>
            )
          })}

        {/* Like & Scrap */}
        <div className={$['like-and-scrap']}>
          <button className={$['like']}>
            <i className="f7-icons">hand_thumbsup</i>
            <span></span>
          </button>
          <button className={$['scrap']}>
            <i className="f7-icons">star</i>
          </button>
        </div>

        {/* Files list */}
        {/* {post.files && post.files.length > 0 && (
          <PostViewerFileContainer files={post.files} />
        )} */}
      </div>

      {/* <Comments comments={comments} ownerId={post.user_id} /> */}
    </div>
  )
}

export type TipsDetailPageProps = {
  tip: TipResponse
  tipErr: GetTipDetail['payload']['err']
}

const TipDetailPage: NextPage<TipsDetailPageProps> = ({ tip, tipErr }) => {
  console.log(tipErr)
  return (
    <Body
      pageTitle={tip?.title ?? '어디로 | 포스트'}
      titleHidden
      bodyClassName={$['eodiro-post-view']}
      hasTopGap={tipErr ? true : false}
    >
      {tip ? (
        <Content tip={tip} />
      ) : tipErr === OneApiError.UNAUTHORIZED ? (
        <div className="overlay-sentinel-spot title-sentinel-spot">
          <RequireAuth />
        </div>
      ) : tipErr === OneApiError.NO_CONTENT ? (
        <div className="overlay-sentinel-spot title-sentinel-spot">
          <Information title="존재하지 않는 포스트입니다." />
        </div>
      ) : null}
    </Body>
  )
}

export default TipDetailPage