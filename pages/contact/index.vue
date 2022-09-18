<template>
  <div class="contact-page">
    <div class="page-body">
      <div class="social">
        <div class="social-links">
          <div class="social-link">
            <a href="https://www.instagram.com/juz40_online/channel/" target="_blank">
              <span>Instagram</span>
              <img src="@/assets/img/new/Instagram.svg" alt="">
            </a>
            <a href="https://www.youtube.com/channel/UCou0pPR7SMLZ4yx6nyZ3KIg" target="_blank">
              <span>YouTube</span>
              <img src="@/assets/img/new/Group.svg" alt="">
            </a>
            <a href="https://www.tiktok.com/@juz40.online" target="_blank">
              <span>TikTok</span>
              <img src="@/assets/img/new/Tiktok.svg" alt="">
            </a>
            <a href="https://t.me/juz40_online" target="_blank">
              <span>Telegram</span>
              <img src="@/assets/img/new/Telegram.svg" alt="">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
.social{
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.social-link{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.social-link a{
  font-size: 20px;
  line-height: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}
.social-link a{
  margin-right: 7rem;
}
.social-link a:last-child{
  margin-right: 0;
}
.social-link a span{
  margin-bottom: 20px;
}
</style>
